import { useState } from 'react'
import { Project, useDeleteProjectMutation, useGetProjectsQuery } from './projectsSlice'
import './ProjectsList.css';
import Table from '../../app/table/Table';
import { toast } from 'react-toastify';
import { AddProjectModal } from './AddProjectModal';
import { EditProjectModal } from './EditProjectModal';
import { AssignEmployeeToProject } from './employee-on-project/AssignEmployeeToProject';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT_ERROR_MESSAGE } from '../../constants';

export const ProjectsList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const {
    data = {
      projects: [],
      totalPages: 0
    }
  } = useGetProjectsQuery(page);
  const [deleteProject] = useDeleteProjectMutation();

  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showShowAssignEmployeeToProjectForm, setShowAssignEmployeeToProjectForm] = useState(false);

  const onEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowEditForm(true);
  }

  const onDeleteProject = async (project: Project) => {
    try {
      await deleteProject(project.id).unwrap();
    } catch (err) {
      toast.error(DELETE_PROJECT_ERROR_MESSAGE);
    }
  }

  const onAssignEmployeeToProject = (project: Project) => {
    setSelectedProject(project);
    setShowAssignEmployeeToProjectForm(true);
  }

  const onViewProject = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  }

  const renderedProjects = <>
    {data.projects.map((project: Project) => (
      <tr key={project.id}>
        <td onClick={() => onViewProject(project.id)} className="clickable-element">{project.name}</td>
        <td onClick={() => onViewProject(project.id)} className="text-truncate description clickable-element">{project.description}</td>
        <td onClick={() => onViewProject(project.id)} className="clickable-element">{project.client?.firstName} {project.client?.lastName}</td>
        <td onClick={() => onViewProject(project.id)} className="clickable-element">{project.teamLead?.firstName} {project.teamLead?.lastName}</td>

        <td className="edit-delete-container">
          <button onClick={() => onEditProject(project)} className="edit-btn">
            <i
              className="bi bi-pencil-square edit-icon">
            </i>
          </button>
          <button onClick={() => onDeleteProject(project)} className="delete-btn">
            <i
              className="bi bi-trash delete-icon">
            </i>
          </button>
          <button onClick={() => onAssignEmployeeToProject(project)} className="add-employee-btn" title="Add Employee on Project">
            <i
              className="bi bi-person-plus add-employee">
            </i>
          </button>
        </td>
      </tr>
    ))}
  </>;

  const tableHeader = <tr className="header">
    <th scope="col">Name</th>
    <th scope="col">Description</th>
    <th scope="col">Client</th>
    <th scope="col">Team Lead</th>
    <th scope="col">&nbsp;</th>
  </tr>;

  return (
    <>
      <Table title="Project List" addModalId="#addProjectModal" header={tableHeader} body={renderedProjects} page={page}
        totalPages={data.totalPages} onSetPage={(currentPage: number) => setPage(currentPage)} />
      <AddProjectModal />
      {(showEditForm && selectedProject) && <EditProjectModal show={showEditForm} project={selectedProject} onClose={() => setShowEditForm(false)} />}
      <AssignEmployeeToProject show={showShowAssignEmployeeToProjectForm} project={selectedProject} onClose={() => setShowAssignEmployeeToProjectForm(false)} />
    </>
  )
}
