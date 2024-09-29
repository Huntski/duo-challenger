import { defineStore } from "pinia";

export interface User {
  ID: number;
  user_name: string;
  timezone?: Date;
}

export type RootState = {
  user: User;
};

export const useMainStore = defineStore({
  id: "mainStore",
  state: () =>
    ({
      user: {},
    } as RootState),

  actions: {
    loginUser(user: User) {
      this.user = user;
    },
  },
});
