import { useState } from 'react';
import styles from './PersonalData.module.css';
import { useNavigate } from 'react-router';
import { ConfirmationWindow } from '../../../../styles/modal/ConfirmationWindow';
import { useProfile } from '../../../auth/hooks/useProfile';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { PersonalDataForm } from '../personal-data-form/PersonalDataForm';
import { DeleteBtn } from '../../ui/delete-btn/DeleteBtn';
import { EditBtn } from '../../ui/edit-btn/EditBtn';

export const PersonalData = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { data: user } = useProfile();
  const { mutate: deleteUser } = useDeleteUser();

  return (
    <div className={styles.data}>
      <div className={styles.img}>
        <img
          src='https://i.pinimg.com/736x/07/fb/34/07fb3452c4640d881a16d08c2e314f3e.jpg'
          alt=''
        />
      </div>
      {!isEditing && user ? (
        <div className={styles.info}>
          {' '}
          <p>
            <strong>Full Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone || 'not provided'}
          </p>
          <p>
            <strong>Address:</strong> {user?.address || 'not provided'}
          </p>
          <div className={styles.btns}>
            <EditBtn onEdit={setIsEditing} />
            <DeleteBtn onClick={setIsModalOpen} />
            <ConfirmationWindow
              isOpen={isModalOpen}
              message='Are you sure you want to delete your account?'
              onConfirm={() => {
                setIsModalOpen(false);
                deleteUser();
                navigate('/');
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      ) : (
        <PersonalDataForm onEditing={setIsEditing} />
      )}
    </div>
  );
};
