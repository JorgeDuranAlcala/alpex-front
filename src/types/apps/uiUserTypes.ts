
export type TUIUserNotificationTypes = 'added' | 'edited' | 'deleted' | 'error';

export interface IUIUserNotificacion {
  isOpen: boolean;
  message?: string;
  type: TUIUserNotificationTypes | null;
}

export interface UIUserSliceState {
  notification: IUIUserNotificacion
}
