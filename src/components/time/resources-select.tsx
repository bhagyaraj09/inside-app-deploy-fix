import { Resource } from '@/types';
interface ProjectsSelectProps {    
    resources: Resource[],
    setResourceId: React.Dispatch<React.SetStateAction<string>>;
    disabled: boolean,
}

export default function ResourcesSelect(props: ProjectsSelectProps) {    
  const handleResourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setResourceId(e.target.value);
}
  return (    
    <select id="resourceId" name="resourceId" className="p-1.5 border rounded-md w-full"  disabled={props.disabled} onChange={handleResourceChange}>
        {props.resources.map( resource => (
            <option key={resource.id} value={resource.id}>{resource.name}</option>
        ))}
    </select>
  );
};