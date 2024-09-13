import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StatusType } from "@/store/redux/type";

interface ChatContent {
  status: StatusType;
  speaker: "user" | "bot";
  content: string;
  timeStamp: Date;
}

interface ChatState {
  contents: ChatContent[];
  chatStatus: "idle" | "progressing" | "finished";
}
export const CHAT_LIMIT = 20;

const initialState: ChatState = {
  contents: [],
  chatStatus: "idle",
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initializeChatState: (
      state,
      action: PayloadAction<ChatContent[] | null>
    ) => {
      if (action.payload?.length) {
        state.contents = [...action.payload];
        state.chatStatus = "idle";
      } else {
        state.contents = [];
        state.chatStatus = "idle";
      }
    },
    triggerChat: (
      state,
      action: PayloadAction<{ speaker: "user" | "bot" }>
    ) => {
      const current = {
        status: "loading" as "loading",
        speaker: action.payload.speaker,
        content: "",
        timeStamp: new Date(),
      };
      state.contents.push(current);

      if (state.chatStatus === "idle") {
        state.chatStatus = "progressing";
      }
    },
    updateContent: (state, action: PayloadAction<{ content: string }>) => {
      state.contents[state.contents.length - 1].content =
        action.payload.content;
      state.contents[state.contents.length - 1].status = "success";

      if (state.contents.length >= 20) state.chatStatus = "finished";
    },
    removeContent: (state) => {
      state.contents.pop();
    },
  },
});

export const {
  initializeChatState,
  triggerChat,
  updateContent,
  removeContent,
} = slice.actions;

export const SEND_RECORD = "test/GET_CHECK_SESSION" as const;

export default slice.reducer;
