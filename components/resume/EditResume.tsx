import LoadingFallback from '../LoadingFallback';
import { ResumeData } from '../../lib/server/redisActions';
import { toast } from 'sonner';

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
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
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
            className="w-full p-2 border rounded-md"
            placeholder="Your full name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="location"
            className="text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
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
            className="w-full p-2 border rounded-md"
            placeholder="Your location"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label
            htmlFor="shortAbout"
            className="text-sm font-medium text-gray-700"
          >
            Short About
          </label>
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
              <div key={index} className="relative p-4 border rounded-md group">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => {
                    const newWorkExperience = [...resume.workExperience];
                    newWorkExperience.splice(index, 1);
                    onChangeResume({
                      ...resume,
                      workExperience: newWorkExperience,
                    });
                  }}
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
                <input
                  className="w-full font-bold mb-2"
                  value={work.title}
                  onChange={(e) => {
                    const newWorkExperience = [...resume.workExperience];
                    newWorkExperience[index] = {
                      ...work,
                      title: e.target.value,
                    };
                    onChangeResume({
                      ...resume,
                      workExperience: newWorkExperience,
                    });
                  }}
                  placeholder="Job Title"
                />
                <input
                  className="w-full mb-2"
                  value={work.company}
                  onChange={(e) => {
                    const newWorkExperience = [...resume.workExperience];
                    newWorkExperience[index] = {
                      ...work,
                      company: e.target.value,
                    };
                    onChangeResume({
                      ...resume,
                      workExperience: newWorkExperience,
                    });
                  }}
                  placeholder="Company"
                />
                <textarea
                  className="w-full"
                  value={work.description}
                  onChange={(e) => {
                    const newWorkExperience = [...resume.workExperience];
                    newWorkExperience[index] = {
                      ...work,
                      description: e.target.value,
                    };
                    onChangeResume({
                      ...resume,
                      workExperience: newWorkExperience,
                    });
                  }}
                  placeholder="Description"
                  rows={3}
                />
              </div>
            ))}
            <button
              className="w-full p-2 border-2 border-dashed rounded-md text-gray-500 hover:border-gray-400"
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
            >
              + Add Work Experience
            </button>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Education</h2>
          <div className="space-y-4">
            {resume?.education?.map((edu, index) => (
              <div key={index} className="relative p-4 border rounded-md group">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => {
                    const newEducation = [...resume.education];
                    newEducation.splice(index, 1);
                    onChangeResume({
                      ...resume,
                      education: newEducation,
                    });
                  }}
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
                <input
                  className="w-full font-bold mb-2"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...resume.education];
                    newEducation[index] = {
                      ...edu,
                      degree: e.target.value,
                    };
                    onChangeResume({
                      ...resume,
                      education: newEducation,
                    });
                  }}
                  placeholder="Degree"
                />
                <input
                  className="w-full mb-2"
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...resume.education];
                    newEducation[index] = {
                      ...edu,
                      school: e.target.value,
                    };
                    onChangeResume({
                      ...resume,
                      education: newEducation,
                    });
                  }}
                  placeholder="School"
                />
                <input
                  className="w-full"
                  value={edu.start}
                  onChange={(e) => {
                    const newEducation = [...resume.education];
                    newEducation[index] = {
                      ...edu,
                      start: e.target.value,
                    };
                    onChangeResume({
                      ...resume,
                      education: newEducation,
                    });
                  }}
                  placeholder="Start Year"
                />
                <input
                  className="w-full"
                  value={edu.end}
                  onChange={(e) => {
                    const newEducation = [...resume.education];
                    newEducation[index] = {
                      ...edu,
                      end: e.target.value,
                    };
                    onChangeResume({
                      ...resume,
                      education: newEducation,
                    });
                  }}
                  placeholder="End Year"
                />
              </div>
            ))}
            <button
              className="w-full p-2 border-2 border-dashed rounded-md text-gray-500 hover:border-gray-400"
              onClick={() => {
                onChangeResume({
                  ...resume,
                  education: [
                    ...resume.education,
                    { degree: '', school: '', start: '', end: '' },
                  ],
                });
              }}
            >
              + Add Education
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.header.skills.map((skill, index) => (
              <div
                key={index}
                className="group relative bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...resume.header.skills];
                    newSkills[index] = e.target.value;
                    onChangeResume({
                      ...resume,
                      header: {
                        ...resume.header,
                        skills: newSkills,
                      },
                    });
                  }}
                  className="bg-transparent border-none outline-none"
                />
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => {
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
            ))}
            <button
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
