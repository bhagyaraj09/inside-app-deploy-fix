import { StatementOfWork } from '@/types';
interface AllProjectsSelectProps {
    id: string,
    sows: StatementOfWork[],
    setSOWId: React.Dispatch<React.SetStateAction<string>>;
    disabled: boolean,
}

export default function AllSOWSelect(props: AllProjectsSelectProps) {  
  const handleSOWChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSOWId(e.target.value);
  }  
  return (
    <select id="sowId" name="sowId" defaultValue={props.id} className="p-1.5 border rounded-md w-full" onChange={handleSOWChange} disabled={props.disabled}>
        {props.sows.map( sow => (
            <option key={sow.id} value={sow.id}>{sow?.project?.name + " - " + sow?.name}</option>
        ))}
    </select>
  );
};