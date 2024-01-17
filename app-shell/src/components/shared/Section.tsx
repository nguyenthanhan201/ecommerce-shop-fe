// Tạo Catalog Filter
const Section = ({ children }: any) => {
  return <div className='section'>{children}</div>;
};

export const SectionTitle = ({ children }: any) => {
  return <div className='section_title'>{children}</div>;
};

export const SectionBody = ({ children }: any) => {
  return <div className='section_body'>{children}</div>;
};

export default Section;
