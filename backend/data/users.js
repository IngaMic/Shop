import bcrypt from "bcryptjs";
//for a quick dummy setup bcrypt.hashSync() is used here
//that will be changed when working with a real data

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Dan User",
        email: "dan@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Ann User",
        email: "ann@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

export default users;
