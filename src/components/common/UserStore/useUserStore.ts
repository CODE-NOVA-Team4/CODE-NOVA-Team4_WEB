import { create } from 'zustand';

interface UserStore {
  userId: string | null; // userId를 관리
  setUserId: (id: string) => void; // userId 업데이트 함수
  clearUserId: () => void; // userId 초기화 함수
}

const useUserStore = create<UserStore>((set) => ({
  userId: null, // 초기값
  setUserId: (id: string) => set({ userId: id }), // userId 설정
  clearUserId: () => set({ userId: null }), // userId 초기화
}));

export default useUserStore;
