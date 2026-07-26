CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site status"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO public.site_settings (id, is_active) VALUES (1, true);
