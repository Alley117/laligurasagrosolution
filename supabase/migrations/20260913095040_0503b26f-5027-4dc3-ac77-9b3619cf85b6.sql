CREATE TABLE public.booking_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  guests text,
  checkin text,
  checkout text,
  cottage text,
  message text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.booking_inquiries TO service_role;
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;