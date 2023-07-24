import { useAppSelector } from "@/store";
import { useRouter } from "next/router";



const useFormStep_recuperateStep = () => {

  const forms = useAppSelector(state => state.stepFormSlice);
  const router = useRouter();

  const getStep = (idAccountFromTab: string | null): { step: number | null, idAccount: string | null } => {
    console.log(forms)
    if (idAccountFromTab) {
      if (forms[idAccountFromTab]) {
        return {
          step: forms[idAccountFromTab].step,
          idAccount: idAccountFromTab
        }
      }
    } else {
      if (router.query.id) {
        if (forms[router.query.id as string]) {

          return {
            step: forms[router.query.id as string].step,
            idAccount: router.query.id as string
          }
        }
      }

    }

    return {
      step: null,
      idAccount: null
    };
  }

  return {
    getStep,
  }


}


export default useFormStep_recuperateStep;
