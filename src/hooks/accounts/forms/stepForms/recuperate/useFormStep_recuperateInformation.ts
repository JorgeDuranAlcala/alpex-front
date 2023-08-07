import { useAppSelector } from "@/store";



const useFormStep_recuperateInformation = () => {

  const forms = useAppSelector(state => state.stepFormSlice);


  console.log(forms)
}


export default useFormStep_recuperateInformation;
