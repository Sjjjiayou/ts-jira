import { useMemo } from "react";
import { useProjects } from "utils/project";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProjects(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setProjectCreate({ projectCreate: undefined });
    if (editingProjectId) {
      setEditingProjectId({ editingProjectId: undefined });
    }
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    isLoading,
    editingProject,
  };
};
