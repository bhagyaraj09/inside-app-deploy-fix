import { Service } from '@/types';
interface ServicesSelectProps {
    id: string,
    services: Service[],
    disabled: boolean,
}

export default function ServicesSelect(props: ServicesSelectProps) {  
  return (
    <select id="serviceId" name="serviceId" defaultValue={props.id} className="p-1.5 border rounded-md w-full" disabled={props.disabled}>
        {props.services.map( service => (
            <option key={service.id} value={service.id}>{service.name}</option>
        ))}
    </select>
  );
};