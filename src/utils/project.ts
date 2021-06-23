import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { User } from "screens/project-list/search-panel";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProject = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject,
    });
  }, [param, run, fetchProject]);

  return result;
};

export const useEditPproject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddPproject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
