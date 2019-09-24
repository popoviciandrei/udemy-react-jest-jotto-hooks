import moxios from "moxios";

import { getSecretWord } from "./hookActions";

describe("moxiso test", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("calls the getSecretWord callback on axios response", async () => {
    const secretWord = "party";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });

    // create mock for axios callback
    const mockSetSecretWord = jest.fn();

    await getSecretWord(mockSetSecretWord);

    // see where it was run
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
