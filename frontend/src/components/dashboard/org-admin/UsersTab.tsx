import clsx from "clsx";
import type { ManagedUser } from "./types";

interface UsersTabProps {
  users: ManagedUser[];
  userStatuses: Record<number, string>;
  onToggleUser: (id: number, enabled: boolean) => void;
  onEnableAll: () => void;
  onDisableAll: () => void;
  onOpenBulkUpload: () => void;
  onOpenAddUser: () => void;
  onRequestRemoveUser: (id: number) => void;
}

export function UsersTab({
  users,
  userStatuses,
  onToggleUser,
  onEnableAll,
  onDisableAll,
  onOpenBulkUpload,
  onOpenAddUser,
  onRequestRemoveUser,
}: UsersTabProps) {
  return (
    <section className="mt-5 space-y-4">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={onOpenBulkUpload}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700"
            >
              Bulk Upload
            </button>
            <button
              type="button"
              onClick={onOpenAddUser}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              + Add User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="hidden w-full min-w-[900px] border-collapse text-sm md:table">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-600">
                <th className="py-2 w-1/4">Name</th>
                <th className="py-2 w-1/4">Email</th>
                <th className="py-2 w-1/6">Role</th>
                <th className="py-2 w-1/6">Join Date</th>
                <th className="py-2 w-1/5">Status</th>
                <th className="py-2 w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3 text-xs text-gray-500">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">{user.joinDate}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={userStatuses[user.id] === "Active"}
                        onChange={(event) => onToggleUser(user.id, event.target.checked)}
                        className="rounded cursor-pointer"
                      />
                      <span
                        className={clsx(
                          "inline-block rounded-full px-2 py-1 text-xs font-medium",
                          userStatuses[user.id] === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {userStatuses[user.id]}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => onRequestRemoveUser(user.id)}
                      className="rounded-lg bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-3 md:hidden">
            {users.map((user) => (
              <article key={user.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <span
                    className={clsx(
                      "inline-block rounded-full px-2 py-1 text-xs font-medium",
                      userStatuses[user.id] === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {userStatuses[user.id]}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-600">Role: {user.role}</p>
                <p className="mt-1 text-xs text-gray-600">Joined: {user.joinDate}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={userStatuses[user.id] === "Active"}
                      onChange={(event) => onToggleUser(user.id, event.target.checked)}
                      className="rounded cursor-pointer"
                    />
                    Enabled
                  </label>
                  <button
                    type="button"
                    onClick={() => onRequestRemoveUser(user.id)}
                    className="rounded-lg bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-200"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onEnableAll}
            className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-200"
          >
            Enable All
          </button>
          <button
            type="button"
            onClick={onDisableAll}
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            Disable All
          </button>
        </div>
      </div>
    </section>
  );
}
