-- Security hardening (2026-10-19). Idempotent: safe to run more than once.
--
-- 1. Orders may only be created by the server (service role), which prices every
--    line from the catalogue. Previously any signed-in user could INSERT directly
--    through the public API with any subtotal/total they liked.
-- 2. Remove table privileges anon/authenticated never need (Supabase grants ALL by
--    default; RLS was the only barrier). TRUNCATE in particular bypasses RLS.
-- 3. has_role() only answers for the caller (or the service role), so users cannot
--    probe whether other accounts are admins.
-- 4. Basic integrity checks on new order rows.

-- 1. Orders: no client-side inserts
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;

-- 2. Least-privilege grants
REVOKE ALL ON public.orders FROM anon;
REVOKE ALL ON public.user_roles FROM anon;
REVOKE INSERT, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.orders FROM authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.user_roles FROM authenticated;
-- authenticated keeps: SELECT on orders (own rows / admins via RLS),
-- UPDATE on orders (admins only via RLS), SELECT on user_roles (own rows / admins via RLS).
GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.user_roles TO service_role;

-- 3. has_role: caller can only check their own roles (service role can check anyone)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (_user_id = auth.uid() OR auth.role() = 'service_role')
  )
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 4. Integrity checks (NOT VALID = enforced for new/updated rows without rescanning old ones)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orders_amounts_check') THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_amounts_check
      CHECK (subtotal >= 0 AND shipping >= 0 AND total = subtotal + shipping) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orders_status_check') THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_status_check
      CHECK (status IN ('Processing', 'Shipped', 'Delivered', 'Cancelled')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orders_payment_method_check') THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_payment_method_check
      CHECK (payment_method IN ('card', 'snapscan', 'eft')) NOT VALID;
  END IF;
END $$;
