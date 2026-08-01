import { Alert, Button, Skeleton } from "antd";
export default function DataState({loading,error,retry}:{loading:boolean;error?:string;retry:()=>void}){
 if(loading) return <section className="page"><Skeleton active paragraph={{rows:8}}/></section>;
 if(error) return <section className="page"><Alert type="error" showIcon message="Unable to load data" description={error} action={<Button onClick={retry}>Retry</Button>}/></section>;
 return null;
}
