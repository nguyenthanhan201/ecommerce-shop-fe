import { ReactNode } from 'react';

type PolicyCardProps = {
  name: string;
  description: string;
  icon: ReactNode;
};

const PolicyCard = (props: PolicyCardProps) => {
  const { name, description, icon } = props;

  return (
    <div className='policy-card'>
      <div className='policy-card_icon'>{icon}</div>
      <div className='policy-card_info'>
        <div className='policy-card_info_name'>{name}</div>
        <div className='policy-card_info_description'>{description}</div>
      </div>
    </div>
  );
};

export default PolicyCard;
