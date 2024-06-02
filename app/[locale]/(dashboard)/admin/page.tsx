import { User } from "@/app/interface";
import { getUsers } from "@/app/api";
import AddNewUser from "@/components/AddNewUser";
import DeleteUser from "@/components/DeleteUser";
import EditUser from "@/components/EditUser";

export const metadata = {
  title: "Admin Portal",
  description: "Admin by Next",
};

export default async function Admin() {
  const users = await getUsers();

  return (
    <div className="container mx-auto px-[4%] py-4">
      <AddNewUser />
      <div className="mt-8">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id} className="bg-white rounded-md shadow-md mb-4">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <div className="flex items-center">
                    <EditUser userData={user} id={user.id} />
                    <DeleteUser id={user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
