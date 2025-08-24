export type Locales = "en" | "id";

export type PageProps<
  params = Record<string, string>,
  searchParams = Record<string, string>
> = {
  params: Promise<params & { locale: Locales }>;
  searchParams?: Promise<searchParams>;
};

export interface Location {
  lat: number;
  lng: number;
}
