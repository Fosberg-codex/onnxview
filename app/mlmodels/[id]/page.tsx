import ModelDetail from "@/app/components/ModelDetail"

export default function ModelPage({ params }:any) {
  return <ModelDetail id={params.id} />
}