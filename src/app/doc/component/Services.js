'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atoms/userAtom';

const Services = () => {
  const user = useAtomValue(userAtom);
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [loading, setLoading] = useState(true);

  // Fetch the doctor's document, including services
  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!user?.uid) return;

      try {
        const docRef = doc(db, 'doctors', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setServices(data.services || []);
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [user?.uid]);

  // Add a new service to Firestore
  const handleAddService = async () => {
    if (!user?.uid) return;

    const updatedServices = [...services, { ...newService, id: Date.now() }];
    try {
      const docRef = doc(db, 'doctors', user.uid);
      await updateDoc(docRef, { services: updatedServices });

      setServices(updatedServices);
      setNewService({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Edit an existing service
  const handleEditChange = async (id, field, value) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, [field]: value } : service
    );

    try {
      const docRef = doc(db, 'doctors', user.uid);
      await updateDoc(docRef, { services: updatedServices });

      setServices(updatedServices);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  // Delete a service from Firestore
  const handleDeleteService = async (id) => {
    const updatedServices = services.filter((service) => service.id !== id);

    try {
      const docRef = doc(db, 'doctors', user.uid);
      await updateDoc(docRef, { services: updatedServices }); // Update Firestore

      setServices(updatedServices); // Update local state
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900">
      <h3 className="pb-2 mb-4 text-2xl font-bold text-purple-600 border-b-2 border-blue-500">
        Services and Consultation fees
      </h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-2 space-y-4">
          {services.map((service) => (
            <li key={service.id} className="flex items-center">
              {editing === service.id ? (
                <>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) =>
                      handleEditChange(service.id, 'name', e.target.value)
                    }
                    className="ml-2 p-1 border rounded"
                  />
                  <input
                    type="number"
                    value={service.price}
                    onChange={(e) =>
                      handleEditChange(service.id, 'price', e.target.value)
                    }
                    className="ml-2 p-1 border rounded"
                  />
                  <button
                    onClick={() => setEditing(null)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="ml-2">
                    {service.name} -{' '}
                    <span className="font-bold text-green-600">
                      ${service.price}
                    </span>
                  </span>
                  <button
                    onClick={() => setEditing(service.id)}
                    className="ml-4 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="ml-2 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Add New Service */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-purple-600">Add New Service</h4>
        <div className="flex items-center mt-4 space-x-4">
          <input
            type="text"
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) =>
              setNewService((prev) => ({ ...prev, name: e.target.value }))
            }
            className="p-2 border rounded-lg shadow-sm w-1/3"
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={(e) =>
              setNewService((prev) => ({ ...prev, price: e.target.value }))
            }
            className="p-2 border rounded-lg shadow-sm w-1/3"
          />
          <button
            onClick={handleAddService}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
