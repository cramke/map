export const actions = {
    contactus: async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        const lat = data["lat"]
        const lon = data["lon"]
        console.log(lat);
        console.log(lon);
        return {
            success: true,
            data
        };
    }
};
