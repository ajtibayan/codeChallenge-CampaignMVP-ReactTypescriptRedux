import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:4000/campaigns", () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      campaigns: [
        { id: 0, name: "Red" },
        { id: 1, name: "Green" },
      ],
    });
  }),
];
