import createTestStore from "../utils/testStore";
import { login } from "../../reducers/userReducer";

let store = createTestStore();

beforeEach(() => {
  store = createTestStore();
});

describe("test user reducer", () => {
  test("user should login successfully", async () => {
    await store.dispatch(
      login({
        email: "johnny_nyl@hotmail.com",
        password: "123",
      })
    );
    expect(store.getState().userReducer.currentUser).toBeDefined();
  });
  test("user should not be able to login with wrong credentials", async () => {
    await store.dispatch(
      login({
        email: "johnny_nyl@hotmail.com",
        password: "12312",
      })
    );
    expect(store.getState().userReducer.currentUser).toBeUndefined();
  });
});
