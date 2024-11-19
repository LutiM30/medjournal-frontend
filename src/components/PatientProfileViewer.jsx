'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileAvatar from './ProfileAvatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Label } from './ui/Elements/label';
import { toast } from 'sonner';

export default function PatientProfileViewer({
  patient = {
    id: '12345',
    displayName: 'John Doe',
    avatarUrl: '/placeholder.svg?height=128&width=128',
    profile: {
      birthdate: '1990-01-01',
      gender: 'Male',
      bloodGroup: 'O+',
      height: '5.9',
      weight: '70',
      allergies: 'None',
      currentMedications: 'None',
      medicalConditions: 'None',
      pastSurgeries: 'None',
      otherNotes: 'Regular check-up required',
    },
  },
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Birthdate', value: patient.profile.birthdate },
        { label: 'Gender', value: patient.profile.gender },
      ],
    },
    {
      title: 'Physical Characteristics',
      items: [
        { label: 'Blood Group', value: patient.profile.bloodGroup },
        { label: 'Height', value: `${patient.profile.height} ft` },
        { label: 'Weight', value: `${patient.profile.weight} kg` },
      ],
    },
    {
      title: 'Medical Information',
      items: [
        { label: 'Allergies', value: patient.profile.allergies },
        {
          label: 'Current Medications',
          value: patient.profile.currentMedications,
        },
        {
          label: 'Medical Conditions',
          value: patient.profile.medicalConditions,
        },
        { label: 'Past Surgeries', value: patient.profile.pastSurgeries },
      ],
    },
    {
      title: 'Additional Notes',
      items: [{ label: 'Other Notes', value: patient.profile.otherNotes }],
    },
  ];
  const id = patient?.profile[`${patient?.role}_id`] || patient.uid;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-blue-900 dark:bg-blue-500 hover:bg-blue-800 dark:hover:bg-blue-600 text-primary-foreground'>
          View
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[625px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            Patient Profile
          </DialogTitle>
        </DialogHeader>
        <div className='flex items-center space-x-4 mb-4'>
          <ProfileAvatar user={patient} className='w-16 h-16' />
          <div
            onClick={() => {
              navigator.clipboard.writeText(id);
              toast?.success(`${id} is copied to clipboard`);
            }}
          >
            <h2 className='text-xl font-semibold'>{patient.displayName}</h2>
            {isDialogOpen ? (
              <TooltipProvider>
                <Tooltip defaultOpen={false}>
                  <TooltipTrigger>
                    <p className='text-sm text-muted-foreground'>
                      <strong>Patient ID: </strong>
                      {id}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side='right'>Click to copy</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <></>
            )}
          </div>
        </div>
        <ScrollArea className='max-h-[60vh]'>
          {profileSections.map((section, index) => (
            <Card key={index} className='mb-4'>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='flex justify-between py-1'>
                    <span className='font-medium'>{item.label}:</span>
                    <span className='text-muted-foreground'>
                      {item.value || 'N/A'}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
