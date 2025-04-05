import LoadingFallback from '../LoadingFallback';
import { ResumeData } from '../../lib/server/redisActions';
import { toast } from 'sonner';
import { DateRangePicker } from '../ui/date-range-picker';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// AddButton component
const AddButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="w-full p-2 border-2 border-dashed rounded-md text-gray-500 hover:border-gray-400"
      onClick={onClick}
    >
      + {label}
    </button>
  );
};

// WorkExperienceField subcomponent
const WorkExperienceField = ({
  work,
  index,
  onUpdate,
  onDelete,
}: {
  work: any;
  index: number;
  onUpdate: (index: number, updatedWork: any) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <div className="relative p-4 border rounded-md group">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        onClick={() => onDelete(index)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label
            htmlFor={`work-title-${index}`}
            className="text-sm font-medium"
          >
            Job Title *
          </Label>
          <Input
            id={`work-title-${index}`}
            value={work.title}
            onChange={(e) => {
              onUpdate(index, {
                ...work,
                title: e.target.value,
              });
            }}
            placeholder="Job Title"
            required
          />
        </div>

        <div>
          <Label
            htmlFor={`work-company-${index}`}
            className="text-sm font-medium"
          >
            Company *
          </Label>
          <Input
            id={`work-company-${index}`}
            value={work.company}
            onChange={(e) => {
              onUpdate(index, {
                ...work,
                company: e.target.value,
              });
            }}
            placeholder="Company"
            required
          />
        </div>

        <div>
          <Label
            htmlFor={`work-location-${index}`}
            className="text-sm font-medium"
          >
            Location *
          </Label>
          <Input
            id={`work-location-${index}`}
            value={work.location}
            onChange={(e) => {
              onUpdate(index, {
                ...work,
                location: e.target.value,
              });
            }}
            placeholder="Location"
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label className="text-sm font-medium">Date Range *</Label>
          <DateRangePicker
            startDate={work.start}
            endDate={work.end}
            onStartDateChange={(date) => {
              onUpdate(index, {
                ...work,
                start: date,
              });
            }}
            onEndDateChange={(date) => {
              onUpdate(index, {
                ...work,
                end: date,
              });
            }}
          />
        </div>

        <div className="md:col-span-2">
          <Label
            htmlFor={`work-description-${index}`}
            className="text-sm font-medium"
          >
            Description *
          </Label>
          <textarea
            id={`work-description-${index}`}
            className="w-full p-2 border rounded-md font-mono text-sm"
            value={work.description}
            onChange={(e) => {
              onUpdate(index, {
                ...work,
                description: e.target.value,
              });
            }}
            placeholder="Description"
            rows={3}
            required
          />
        </div>
      </div>
    </div>
  );
};

// EducationField subcomponent
const EducationField = ({
  edu,
  index,
  onUpdate,
  onDelete,
}: {
  edu: any;
  index: number;
  onUpdate: (index: number, updatedEdu: any) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <div className="relative p-4 border rounded-md group">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        onClick={() => onDelete(index)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label
            htmlFor={`edu-degree-${index}`}
            className="text-sm font-medium"
          >
            Degree *
          </Label>
          <Input
            id={`edu-degree-${index}`}
            value={edu.degree}
            onChange={(e) => {
              onUpdate(index, {
                ...edu,
                degree: e.target.value,
              });
            }}
            placeholder="Degree"
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label
            htmlFor={`edu-school-${index}`}
            className="text-sm font-medium"
          >
            School *
          </Label>
          <Input
            id={`edu-school-${index}`}
            value={edu.school}
            onChange={(e) => {
              onUpdate(index, {
                ...edu,
                school: e.target.value,
              });
            }}
            placeholder="School"
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label className="text-sm font-medium">Date Range *</Label>
          <DateRangePicker
            startDate={edu.start}
            endDate={edu.end}
            onStartDateChange={(date) => {
              onUpdate(index, {
                ...edu,
                start: date,
              });
            }}
            onEndDateChange={(date) => {
              onUpdate(index, {
                ...edu,
                end: date,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

// SkillField subcomponent
const SkillField = ({
  skill,
  index,
  onUpdate,
  onDelete,
}: {
  skill: string;
  index: number;
  onUpdate: (index: number, updatedSkill: string) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <div className="group relative bg-gray-100 px-3 py-1 rounded-full w-fit flex items-center gap-2">
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdate(index, e.currentTarget.textContent || '')}
        className="bg-transparent outline-none h-6 py-0 min-w-[40px] overflow-hidden whitespace-nowrap"
        style={{ width: 'fit-content' }}
      >
        {skill}
      </div>
      <button
        className="text-gray-400 hover:text-red-500 transition-colors"
        onClick={() => onDelete(index)}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export const EditResume = ({
  resume,
  profilePicture,
  onChangeResume,
}: {
  resume?: ResumeData | null;
  profilePicture?: string;
  onChangeResume: (newResume: ResumeData) => void;
}) => {
  if (!resume) {
    return <LoadingFallback message="Loading Resume..." />;
  }

  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4 my-8 px-4"
      aria-label="Resume Content editing"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            value={resume?.header?.name || ''}
            onChange={(e) => {
              onChangeResume({
                ...resume,
                header: {
                  ...resume.header,
                  name: e.target.value,
                },
              });
            }}
            placeholder="Your full name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="location"
            className="text-sm font-medium text-gray-700"
          >
            Location
          </Label>
          <Input
            type="text"
            id="location"
            value={resume?.header?.location || ''}
            onChange={(e) => {
              onChangeResume({
                ...resume,
                header: {
                  ...resume.header,
                  location: e.target.value,
                },
              });
            }}
            placeholder="Your location"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <Label
            htmlFor="shortAbout"
            className="text-sm font-medium text-gray-700"
          >
            Short About
          </Label>
          <textarea
            className="w-full p-2 border rounded-md font-mono text-sm"
            value={resume?.header?.shortAbout || ''}
            onChange={(e) => {
              onChangeResume({
                ...resume,
                header: {
                  ...resume.header,
                  shortAbout: e.target.value,
                },
              });
            }}
            rows={4}
            placeholder="Brief description about yourself..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Summary Section */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">About</h2>
          <textarea
            className="w-full p-2 border rounded-md font-mono text-sm"
            value={resume?.summary}
            onChange={(e) => {
              onChangeResume({
                ...resume,
                summary: e.target.value,
              });
            }}
            rows={4}
            placeholder="Enter your professional summary..."
          />
        </div>

        {/* Work Experience Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <div className="space-y-4">
            {resume?.workExperience?.map((work, index) => (
              <WorkExperienceField
                key={index}
                work={work}
                index={index}
                onUpdate={(index, updatedWork) => {
                  const newWorkExperience = [...resume.workExperience];
                  newWorkExperience[index] = updatedWork;
                  onChangeResume({
                    ...resume,
                    workExperience: newWorkExperience,
                  });
                }}
                onDelete={(index) => {
                  const newWorkExperience = [...resume.workExperience];
                  newWorkExperience.splice(index, 1);
                  onChangeResume({
                    ...resume,
                    workExperience: newWorkExperience,
                  });
                }}
              />
            ))}
            <AddButton
              label="Add Work Experience"
              onClick={() => {
                onChangeResume({
                  ...resume,
                  workExperience: [
                    ...resume.workExperience,
                    {
                      title: '',
                      company: '',
                      description: '',
                      location: '',
                      link: '',
                      contract: '',
                      start: '',
                    },
                  ],
                });
              }}
            />
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Education</h2>
          <div className="space-y-4">
            {resume?.education?.map((edu, index) => (
              <EducationField
                key={index}
                edu={edu}
                index={index}
                onUpdate={(index, updatedEdu) => {
                  const newEducation = [...resume.education];
                  newEducation[index] = updatedEdu;
                  onChangeResume({
                    ...resume,
                    education: newEducation,
                  });
                }}
                onDelete={(index) => {
                  const newEducation = [...resume.education];
                  newEducation.splice(index, 1);
                  onChangeResume({
                    ...resume,
                    education: newEducation,
                  });
                }}
              />
            ))}
            <AddButton
              label="Add Education"
              onClick={() => {
                onChangeResume({
                  ...resume,
                  education: [
                    ...resume.education,
                    { degree: '', school: '', start: '', end: '' },
                  ],
                });
              }}
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.header.skills.map((skill, index) => (
              <SkillField
                key={index}
                skill={skill}
                index={index}
                onUpdate={(index, updatedSkill) => {
                  const newSkills = [...resume.header.skills];
                  newSkills[index] = updatedSkill;
                  onChangeResume({
                    ...resume,
                    header: {
                      ...resume.header,
                      skills: newSkills,
                    },
                  });
                }}
                onDelete={(index) => {
                  const newSkills = [...resume.header.skills];
                  newSkills.splice(index, 1);
                  onChangeResume({
                    ...resume,
                    header: {
                      ...resume.header,
                      skills: newSkills,
                    },
                  });
                }}
              />
            ))}
          </div>
          <AddButton
            label="Add Skill"
            onClick={() => {
              const skillToAdd = prompt('Enter a new skill:');
              if (skillToAdd) {
                if (resume.header.skills.includes(skillToAdd)) {
                  toast.warning('This skill is already added.');
                } else {
                  onChangeResume({
                    ...resume,
                    header: {
                      ...resume.header,
                      skills: [...resume.header.skills, skillToAdd],
                    },
                  });
                  toast.success('Skill added successfully.');
                }
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};
