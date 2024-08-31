import { SOWResource } from '@/types';
interface ProjectsSelectProps {
    id: string,
    projects: SOWResource[],
    disabled: boolean,
}

export default function ProjectsSelect(props: ProjectsSelectProps) {    
  return (
    <select id="sowId" name="sowId" defaultValue={props.id} className="p-1.5 border rounded-md w-full"  disabled={props.disabled}>
        {props.projects.map( project => (
            <option key={project.id} value={project.sowId}>{project.statementOfWork?.project?.name + " - " + project.statementOfWork?.name}</option>
        ))}
    </select>
  );
};