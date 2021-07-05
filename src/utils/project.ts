import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { User } from "screens/project-list/search-panel";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["project", param], () =>
    client("projects", { data: param })
  );
};

export const useEditPproject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    { onSuccess: () => queryClient.invalidateQueries("project") }
  );
};

export const useAddPproject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    { onSuccess: () => queryClient.invalidateQueries("project") }
  );
};

export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users"));
  }, [param, client, run]);

  return result;
};

export const useProjects = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["projects", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
