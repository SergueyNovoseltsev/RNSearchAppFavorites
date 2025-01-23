import { ApiGetCharProps, Character } from "@/app/models/character";
import { useGetFetch } from "../useFetch";
import { Episode } from "@/app/models/episode";
import { Location } from "@/app/models/location";
import { GetApiFetch } from "@/app/models/api";

export function useGetCharList({
  name,
  species,
  type,
  status,
  gender,
  page,
}: ApiGetCharProps) {
  const buildUrl = () => {
    const params = {
      page,
      name,
      status,
      species,
      gender,
      type,
    };

    const queryString = Object.entries(params)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    return `https://rickandmortyapi.com/api/character?${queryString}`;
  };

  return useGetFetch<GetApiFetch<Character[]>>(buildUrl());
}

function useGetApiData<T>(endpoint: string, idOrIds?: string | undefined) {
  return useGetFetch<T>(
    `https://rickandmortyapi.com/api/${endpoint}/${idOrIds ?? ""}`
  );
}

export function useGetCharacterDetail(id: string) {
  return useGetApiData<Character>("character", id);
}

export function useGetEpisodeList(ids?: string) {
  return useGetApiData<Episode[]>("episode", ids);
}

export function useGetLocation(id?: string) {
  return useGetApiData<Location>("location", id);
}
