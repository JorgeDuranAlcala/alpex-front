import { useAppSelector } from "@/store";
import { useRouter } from "next/router";



const useFormStep_recuperateStep = () => {

  const forms = useAppSelector(state => state.stepFormSlice);
  const router = useRouter();

  const getLastStep = (idAccount: number | null, isNewAccount = false): {
    lastStep: number | null,

    idAccountFromQuery: number | null
  } => {

    // console.log(forms)
    let lastStep: number | null = null;
    let idAccountFromQuery: number | null = null;
    if (isNewAccount) {
      if (forms['New Account']) {
        lastStep = forms['New Account'].step;
      }


    } else {

      if (idAccount) {
        if (forms[idAccount]) {
          lastStep = forms[idAccount].step;
        }
      } else {

        if (router.query.idAccount) {
          idAccountFromQuery = Number(router.query.idAccount)
          if (forms[idAccountFromQuery]) {
            lastStep = forms[idAccountFromQuery].step;
          }
        }

      }
    }


    return {
      lastStep,
      idAccountFromQuery
    };
  }

  return {
    getLastStep,
  }


}


export default useFormStep_recuperateStep;
