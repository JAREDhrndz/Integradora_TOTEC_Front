import { useState, useEffect } from 'react';
import { Table, Space, Button, message, Popconfirm, Input, Select, Modal, Form, FloatButton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, SearchOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Users.css';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  username: string;
  status: boolean;
  createdAt: string;
  phone?: string;
}

const Users = () => {
  //modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: 'user',
    status: true
  });
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState<'name' | 'email' | 'username' | 'role'>('name');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchText, searchField]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/users`);
      // Filtrar solo usuarios activos
      const activeUsers = response.data.userList.filter((user: User) => user.status);
      setUsers(activeUsers);
    } catch {
      message.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    if (!searchText) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => {
      const value = user[searchField];
      return value?.toString().toLowerCase().includes(searchText.toLowerCase());
    });

    setFilteredUsers(filtered);
  };

  const handleEdit = (user: User) => {
    setEditingId(user._id);
    setEditedUser({ ...user });
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/deleteUser/${userToDelete}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      message.success(response.data.message);
      setIsDeleteModalVisible(false);
      fetchUsers(); // Actualiza la lista de usuarios
    } catch (error) {
      message.error('Error al eliminar usuario');
    }
  };

  const handleSave = async (id: string) => {
    try {
      if (!editedUser.name || !editedUser.email || !editedUser.role) {
        message.error('Nombre, email y rol son obligatorios');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editedUser.email)) {
        message.error('Ingrese un email válido');
        return;
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/updateUser/${id}`,
        {
          name: editedUser.name,
          email: editedUser.email,
          phone: editedUser.phone,
          role: editedUser.role,
          status: editedUser.status
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      message.success(response.data.message);
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Error al actualizar usuario');
      } else {
        message.error('Error desconocido al actualizar');
      }
    }
  };

  const handleAddUser = async () => {
    const errors = {
      name: !newUser.name ? 'Nombre es requerido' : '',
      username: !newUser.username ? 'Username es requerido' : '',
      password: !newUser.password ? 'Contraseña es requerida' : 
               !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(newUser.password) ? 
               'La contraseña no cumple los requisitos' : '',
      confirmPassword: !newUser.confirmPassword ? 'Confirme la contraseña' : 
                     newUser.password !== newUser.confirmPassword ? 'Las contraseñas no coinciden' : '',
      email: !newUser.email ? 'Email es requerido' : 
             !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email) ? 'Email no válido' : '',
      phone: newUser.phone && newUser.phone.length < 10 ? 'Mínimo 10 dígitos' : ''
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      message.error('Por favor complete todos los campos obligatorios correctamente', 5);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user`, 
        newUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      message.success(`Usuario ${response.data.user.name} creado`);
      setIsAddModalVisible(false);
      setNewUser({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        role: 'user',
        status: true
      });
      fetchUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Error al crear usuario');
      } else {
        message.error('Error desconocido al crear usuario');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = <K extends keyof User>(field: K, value: User[K]) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const [formErrors, setFormErrors] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: ''
  });

  const columns: ColumnsType<User> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => 
        editingId === record._id ? (
          <Input
            value={editedUser.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) =>
        editingId === record._id ? (
          <Input
            value={editedUser.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) =>
        editingId === record._id ? (
          <Select
            value={editedUser.role}
            style={{ width: 120 }}
            onChange={(value) => handleChange('role', value)}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'Usuario' },
            ]}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) =>
        editingId === record._id ? (
          <Select
            value={editedUser.status}
            style={{ width: 120 }}
            onChange={(value) => handleChange('status', value)}
            options={[
              { value: true, label: 'Activo' },
              { value: false, label: 'Inactivo' },
            ]}
          />
        ) : (
          <span className={status ? 'status-active' : 'status-inactive'}>
            {status ? 'Activo' : 'Inactivo'}
          </span>
        ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          {editingId === record._id ? (
            <>
              <Button className="simple-save-btn" onClick={() => handleSave(record._id)}>
                Guardar
              </Button>
              <Button className="simple-cancel-btn" onClick={handleCancel}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button className="simple-edit-btn" onClick={() => handleEdit(record)}>
                Editar
              </Button>
              <Button 
                className="simple-delete-btn" 
                onClick={() => {
                  setUserToDelete(record._id);
                  setIsDeleteModalVisible(true);
                }}
              >
                Eliminar
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="users-content">
      <div className="users-header">
        <div className="users-title-container">
          <h2>Gestión de Usuarios</h2>
          <p className="users-subtitle">Registro de actividades de usuarios.</p>
        </div>
        
        <div className="users-actions">
          <div className="search-bar">
            <Select
              defaultValue="name"
              style={{ width: 180 }}
              onChange={(value) => setSearchField(value)}
              className="dark-select"
              options={[
                { value: 'name', label: <span><UserOutlined /> Nombre</span> },
                { value: 'email', label: <span><MailOutlined /> Email</span> },
                { value: 'username', label: <span><UserOutlined /> Usuario</span> },
                { value: 'role', label: <span><UserOutlined /> Rol</span> },
              ]}
            />
            <Input
              placeholder="Buscar..."
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="dark-input"
              style={{ width: 250 }}
            />
          </div>
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
            className="add-user-button"
          >
            Agregar Usuario
          </Button>
        </div>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="dark-table"
      />

    <Modal
      title="Confirmar Eliminación"
      open={isDeleteModalVisible}
      onOk={handleDelete}
      onCancel={() => setIsDeleteModalVisible(false)}
      okText="Eliminar"
      cancelText="Cancelar"
      className="dark-modal"
      okButtonProps={{ danger: true }}
    >
      <p>¿Estás seguro de desactivar este usuario?</p>
      <p>Se ocultará del sistema pero no se borrarán sus datos.</p>
    </Modal>

    <Modal
  title="Nuevo Usuario"
  open={isAddModalVisible}
  onOk={handleAddUser}
  onCancel={() => {
    setIsAddModalVisible(false);
    setFormErrors({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: ''
    });
  }}
  okText="Crear"
  cancelText="Cancelar"
  className="dark-modal"
>
  <Form layout="vertical">
    <Form.Item 
      label="Nombre" 
      required
      validateStatus={formErrors.name ? 'error' : ''}
      help={formErrors.name}
    >
      <Input 
        value={newUser.name}
        onChange={(e) => {
          setNewUser({...newUser, name: e.target.value});
          setFormErrors({...formErrors, name: e.target.value ? '' : 'Nombre es requerido'});
        }}
        className="dark-input"
      />
    </Form.Item>
    
    <Form.Item 
      label="Username" 
      required
      validateStatus={formErrors.username ? 'error' : ''}
      help={formErrors.username}
    >
      <Input
        value={newUser.username}
        onChange={(e) => {
          setNewUser({...newUser, username: e.target.value});
          setFormErrors({...formErrors, username: e.target.value ? '' : 'Username es requerido'});
        }}
        className="dark-input"
      />
    </Form.Item>
    
    <Form.Item 
      label="Contraseña" 
      required
      validateStatus={formErrors.password ? 'error' : ''}
      help={formErrors.password || "Mínimo 6 caracteres, con mayúscula, número y carácter especial"}
    >
      <Input.Password
        value={newUser.password}
        onChange={(e) => {
          setNewUser({...newUser, password: e.target.value});
          let error = '';
          if (!e.target.value) {
            error = 'Contraseña es requerida';
          } else if (!/(?=.*[A-Z])/.test(e.target.value)) {
            error = 'Debe contener al menos una mayúscula';
          } else if (!/(?=.*\d)/.test(e.target.value)) {
            error = 'Debe contener al menos un número';
          } else if (!/(?=.*[!@#$%^&*()_+])/.test(e.target.value)) {
            error = 'Debe contener un carácter especial';
          } else if (e.target.value.length < 6) {
            error = 'Mínimo 6 caracteres';
          }
          setFormErrors({...formErrors, password: error});
        }}
        className="dark-input"
      />
    </Form.Item>
    
    <Form.Item 
      label="Confirmar Contraseña" 
      required
      validateStatus={formErrors.confirmPassword ? 'error' : ''}
      help={formErrors.confirmPassword}
    >
      <Input.Password
        value={newUser.confirmPassword}
        onChange={(e) => {
          setNewUser({...newUser, confirmPassword: e.target.value});
          setFormErrors({...formErrors, confirmPassword: e.target.value === newUser.password ? '' : 'Las contraseñas no coinciden'});
        }}
        className="dark-input"
      />
    </Form.Item>
    
    <Form.Item 
      label="Email" 
      required
      validateStatus={formErrors.email ? 'error' : ''}
      help={formErrors.email}
    >
      <Input
        type="email"
        value={newUser.email}
        onChange={(e) => {
          setNewUser({...newUser, email: e.target.value});
          let error = '';
          if (!e.target.value) {
            error = 'Email es requerido';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
            error = 'Email no válido';
          }
          setFormErrors({...formErrors, email: error});
        }}
        className="dark-input"
      />
    </Form.Item>
    
    <Form.Item 
      label="Teléfono"
      validateStatus={formErrors.phone ? 'error' : ''}
      help={formErrors.phone}
    >
      <Input
        value={newUser.phone}
        onChange={(e) => {
          setNewUser({...newUser, phone: e.target.value});
          setFormErrors({...formErrors, phone: e.target.value && e.target.value.length < 10 ? 'Mínimo 10 dígitos' : ''});
        }}
        className="dark-input"
      />
    </Form.Item>
    
    <Form.Item label="Rol">
      <Select
        value={newUser.role}
        onChange={(value) => setNewUser({...newUser, role: value})}
        className="dark-select"
      >
        <Select.Option value="admin">Administrador</Select.Option>
        <Select.Option value="user">Usuario</Select.Option>
      </Select>
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export default Users;