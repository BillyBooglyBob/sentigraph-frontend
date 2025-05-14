"use client";

import DataModal from "@/components/data-table/DataModal";
import DataForm from "@/components/admin/DataForm";

const UserDataFormModal = () => {
  return (
    <DataModal
      title="Add a user"
      description="Add a user. You can add a user by entering the name, email and password."
      ModalForm={DataForm}
    />
  );
};

export default UserDataFormModal;
