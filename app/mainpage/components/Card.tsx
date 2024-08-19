interface JobCardProps {
  id: number;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  company: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  location,
  description,
  imageUrl,
  company,
}) => {
  return (
    <div className="relative flex flex-wrap  justify-start mb-4 mr-4  p-5 bg-white border border-transparent rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300  mb-4">
      <div className="flex flex-wrap">
        <img
          src={imageUrl}
          alt={title}
          width={80}
          height={80}
          className="rounded-lg mr-4"
        />
        <div>
          <p className="text-[#25324B] font-epilogue text-[24px] font-semibold leading-[24px]">
            {title}
          </p>
          <div className="flex items-center text-[#7C8493] font-light text-lg">
            <span>{company}</span>
            <span className="mx-2">•</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-epilogue text-base font-normal leading-[25.6px]">
          {description}
        </p>
        <div className="sm:w-[246px] h-[35px] flex grid-cols-3 gap-2 mt-3">
          <div className="border-r-2">
            <div className="bg-emerald-100 w-[96px] h-[41px] rounded-[80px] px-[10px] py-[6px] text-[#56CDAD] flex items-center justify-center">
              In Person
            </div>
          </div>
          <div className="border border-[#FFB836] w-[91px] h-[41px] text-[#FFB836] rounded-[80px] px-[10px] py-[6px]  flex items-center justify-center">
            Education
          </div>
          <div className="border border-[#4640DE] w-[70px] h-[41px] rounded-[80px] px-[10px] py-[6px] text-[#000000] flex items-center justify-center  bg-white">
            IT
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
