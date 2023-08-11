import { useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BackButtonProps, TabButton } from "../interfaces/types";
import { addTabButton, removeTabButtonByText, setBackTabButtonProps, setMultiTabBaseLink } from "../store/MultiTabButtonSlice";


export const useMultiTabButtons = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const setBaseLink = useCallback(() => {
    dispatch(setMultiTabBaseLink(router.asPath));
  }, [dispatch, router.asPath]);

  const addNewTabButton = useCallback((tabButton: TabButton) => {
    dispatch(addTabButton(tabButton))
  }, [dispatch]);

  const setBackButtonProps = useCallback((backButtonProps: BackButtonProps) => {
    dispatch(setBackTabButtonProps(backButtonProps));
  }, [dispatch,]);

  const removeTabByText = useCallback((text: string) => {
    dispatch(removeTabButtonByText(text));

  }, [dispatch,]);

  return {
    setBaseLink,
    addNewTabButton,
    setBackButtonProps,
    removeTabByText
  }
}
