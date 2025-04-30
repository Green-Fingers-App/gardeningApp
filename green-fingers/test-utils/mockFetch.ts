export const mockFetchResponse = (status: number, data: any): jest.MockedFunction<any> =>
	jest.fn(() =>
		Promise.resolve({
			ok: status >= 200 && status < 300,
			json: () => Promise.resolve(data),
		})
	);
