import { Card, Heading, Text, Grid, Stack, Separator, Link } from 'shadcn/ui';

const Overview = () => {
    const doctorProfile = {
        practiceAddress: {
            street1: "123 Main St",
            street2: "",
            city: "Toronto",
            province: "ON",
            postalCode: "M1K 1A1"
        },
        yearsOfExperience: 15,
        currentRole: "Consultant",
        hospitalAffiliations: ["General Hospital", "St. Michael's Hospital"],
        clinicName: "Downtown Health Clinic",
        officePhoneNumber: "(416) 123-4567",
        officeEmail: "contact@downtownclinic.com",
        websites: [
            { type: "Personal Website", website: "https://drjohnczaja.com" },
            { type: "Appointment Booking", website: "https://bookdrjohn.com" }
        ],
        primarySpecialty: "Cardiology",
        subspecialties: ["Interventional Cardiology", "Heart Failure"],
        procedures: ["Angioplasty", "Cardiac Catheterization"],
        ageGroupsTreated: ["Adult", "Geriatric"],
        specificPatientGroups: ["Cardiac patients", "Post-surgical patients"],
        technologiesProficient: ["Echocardiography", "Cardiac MRI"]
    };

    return (
        <Card className="p-6 mb-6 shadow-lg rounded-lg">
            <Heading size="lg" className="mb-4">Doctor Profile</Heading>

            {/* Address Section */}
            <Stack gap="2">
                <Text className="font-semibold">Practice Address:</Text>
                <Text>{doctorProfile.practiceAddress.street1}</Text>
                {doctorProfile.practiceAddress.street2 && <Text>{doctorProfile.practiceAddress.street2}</Text>}
                <Text>{`${doctorProfile.practiceAddress.city}, ${doctorProfile.practiceAddress.province}, ${doctorProfile.practiceAddress.postalCode}`}</Text>
            </Stack>

            <Separator className="my-4" />

            {/* Experience, Role, and Affiliations */}
            <Grid className="grid grid-cols-2 gap-4">
                <Stack gap="2">
                    <Text className="font-semibold">Years of Experience:</Text>
                    <Text>{doctorProfile.yearsOfExperience} years</Text>
                </Stack>

                <Stack gap="2">
                    <Text className="font-semibold">Current Role:</Text>
                    <Text>{doctorProfile.currentRole}</Text>
                </Stack>

                <Stack gap="2">
                    <Text className="font-semibold">Hospital Affiliations:</Text>
                    <Text>{doctorProfile.hospitalAffiliations.join(", ")}</Text>
                </Stack>

                <Stack gap="2">
                    <Text className="font-semibold">Clinic Name:</Text>
                    <Text>{doctorProfile.clinicName}</Text>
                </Stack>
            </Grid>

            <Separator className="my-4" />

            {/* Contact Information */}
            <Stack gap="2">
                <Text className="font-semibold">Office Phone:</Text>
                <Text>{doctorProfile.officePhoneNumber}</Text>

                <Text className="font-semibold">Office Email:</Text>
                <Text>{doctorProfile.officeEmail}</Text>
            </Stack>

            <Separator className="my-4" />

            {/* Websites */}
            <Stack gap="2">
                <Text className="font-semibold">Websites:</Text>
                {doctorProfile.websites.map((site, index) => (
                    <Link key={index} href={site.website} target="_blank" className="text-blue-600">
                        {site.type}: {site.website}
                    </Link>
                ))}
            </Stack>

            <Separator className="my-4" />

            {/* Specialty and Subspecialties */}
            <Grid className="grid grid-cols-2 gap-4">
                <Stack gap="2">
                    <Text className="font-semibold">Primary Specialty:</Text>
                    <Text>{doctorProfile.primarySpecialty}</Text>
                </Stack>

                <Stack gap="2">
                    <Text className="font-semibold">Subspecialties:</Text>
                    <Text>{doctorProfile.subspecialties.join(", ")}</Text>
                </Stack>
            </Grid>

            <Separator className="my-4" />

            {/* Procedures, Age Groups, Patient Groups, and Technologies */}
            <Grid className="grid grid-cols-2 gap-4">
                <Stack gap="2">
                    <Text className="font-semibold">Procedures Offered:</Text>
                    <Text>{doctorProfile.procedures.join(", ")}</Text>
                </Stack>

                <Stack gap="2">
                    <Text className="font-semibold">Age Groups Treated:</Text>
                    <Text>{doctorProfile.ageGroupsTreated.join(", ")}</Text>
                </Stack>

                <Stack gap="2">
                    <Text className="font-semibold">Specialized Patient Groups:</Text>
                    <Text>{doctorProfile.specificPatientGroups.join(", ")}</Text>
                </Stack>

                <Stack gap="2">
                    <Text className="font-semibold">Medical Technologies/Techniques:</Text>
                    <Text>{doctorProfile.technologiesProficient.join(", ")}</Text>
                </Stack>
            </Grid>
        </Card>
    );
};

export default Overview;
