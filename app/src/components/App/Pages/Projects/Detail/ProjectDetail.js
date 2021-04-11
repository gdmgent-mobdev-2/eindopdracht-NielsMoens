import {useParams} from "react-router";
import useFetch from "../../../../../core/hooks/useFetch";
import {fetchProject} from "../../../../../core/modules/projects/api";
import {useCallback} from "react";
import LogOverview from "./LogOverview/LogOverview";
import Button from "../../../../Design/Button";
import AdminRoute from "../../../../Shared/Admin/AdminRoute";
import AdminContainer from "../../../../Shared/Admin/AdminContainer";


const ProjectDetail = () => {
    const { id }=useParams();

    const apiCall = useCallback(()=>{
        return fetchProject(id)
    },[id])

    const {
        data: project,
        error,
        isLoading
    } = useFetch(apiCall);

    // const handleCreateLog = () => {
    //     setCurrentLog({});
    // };


    return (
        <>
            {/*{console.log(project)}*/}
            {

                project && <h1>Product detail page of '{project.name}' WOEHOOE  </h1>
            }
            <AdminContainer>
                <Button // onClick={handleCreaLog}te
                >
                    Create Log
                </Button>
            </AdminContainer>

            <LogOverview projectId={id} />
        </>
    )
};

export default ProjectDetail;