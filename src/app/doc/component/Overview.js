const Overview = () => {
  const doctorProfile = {
    yearsOfExperience: 15,
    currentRole: 'Consultant',
    hospitalAffiliations: ['General Hospital', "St. Michael's Hospital"],
    clinicName: 'Downtown Health Clinic',
    primarySpecialty: 'Cardiology',
    subspecialties: ['Interventional Cardiology', 'Heart Failure'],
    procedures: ['Angioplasty', 'Cardiac Catheterization'],
    ageGroupsTreated: ['Adult', 'Geriatric'],
    specificPatientGroups: ['Cardiac patients', 'Post-surgical patients'],
    technologiesProficient: ['Echocardiography', 'Cardiac MRI'],
  };

  return (
    <div className='max-w-4xl p-6 mx-auto mb-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg dark:bg-slate-900'>
      {' '}
      {/* Colorful border */}
      <h2 className='mb-4 text-2xl font-semibold text-blue-600'>
        Doctor Profile
      </h2>{' '}
      {/* Heading color */}
      <hr className='my-4' />
      {/* Experience, Role, and Affiliations */}
      <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
        <div>
          <h3 className='font-semibold text-purple-600'>
            Years of Experience:
          </h3>
          <p>{doctorProfile.yearsOfExperience} years</p>
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>Current Role:</h3>
          <p>{doctorProfile.currentRole}</p>
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>
            Hospital Affiliations:
          </h3>
          <p>{doctorProfile.hospitalAffiliations.join(', ')}</p>
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>Clinic Name:</h3>
          <p>{doctorProfile.clinicName}</p>
        </div>
      </div>
      <hr className='my-4' />
      {/* Specialty and Subspecialties */}
      <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2'>
        <div>
          <h3 className='font-semibold text-purple-600'>Primary Specialty:</h3>
          <p>{doctorProfile.primarySpecialty}</p>
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>Subspecialties:</h3>
          <p>{doctorProfile.subspecialties.join(', ')}</p>
        </div>
      </div>
      <hr className='my-4' />
      {/* Procedures, Age Groups, Patient Groups, and Technologies */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <h3 className='font-semibold text-purple-600'>Procedures Offered:</h3>
          <p>{doctorProfile.procedures.join(', ')}</p>
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>Age Groups Treated:</h3>
          <p>{doctorProfile.ageGroupsTreated.join(', ')}</p>
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>
            Specialized Patient Groups:
          </h3>
          <p>{doctorProfile.specificPatientGroups.join(', ')}</p>
        </div>
        <div>
          <h3 className='font-semibold text-purple-600'>
            Medical Technologies/Techniques:
          </h3>
          <p>{doctorProfile.technologiesProficient.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
