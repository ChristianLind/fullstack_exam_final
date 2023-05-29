import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ProblemEntity } from "./problemEntity";
import { Platform } from "react-native";

const baseUrl: string = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const useGetProblems = () => {
    const fetchProblems = async () => {
        return await axios.get("http://" + baseUrl + ':3000/problems');
    }

    //custom hook til at fetche
    //querykey skal være et array
    //queryFn = query function
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['problems'], queryFn: fetchProblems });
    return {isLoading, isError, data: data?.data, error}
}

export const usePostProblem = () => {
    return useMutation({
        //mutation brugt til create, update, delete data eller udføre serverside effect
        mutationFn: (newProblem: ProblemEntity) => {
            return axios.post("http://" + baseUrl + ':3000/problems', newProblem)
        }
    })
}