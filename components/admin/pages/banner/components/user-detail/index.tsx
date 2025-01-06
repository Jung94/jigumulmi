import styles from './user-detail.module.scss';
import { Input } from '@/components/admin/form';

type Props = {
  member: any
}

const UserDetail = ({
  member,
}: Props) => {
  const leftPad = (value: number): string => {
    if (value >= 10) return String(value);
    return `0${value}`;
  }

  const getDate = (date: Date) => {
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1);
    const day = leftPad(date.getDate());

    return [year, month, day].join('-');
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.filters_wrap}>
        <Input 
          type='text' 
          name='ID' 
          value={member?.id ?? ''} 
          disabled
          styleLabel={{fontSize: '0.875rem'}} 
          style={{color: '#333'}}
        />
        <Input 
          type='text' 
          name='Kakao ID' 
          value={member?.kakaoUserId ?? ''} 
          disabled
          styleLabel={{fontSize: '0.875rem'}} 
          style={{color: '#333'}}
        />
        <Input 
          type='text' 
          name='이름' 
          value={member?.nickname ?? ''} 
          disabled
          styleLabel={{fontSize: '0.875rem'}} 
          style={{color: '#333'}}
        />
        <Input 
          type='text' 
          name='이메일' 
          value={member?.email ?? ''} 
          disabled
          styleLabel={{fontSize: '0.875rem'}} 
          style={{color: '#333'}}
        />
        <Input 
          type='text' 
          name='생성일' 
          value={member?.createdAt ? getDate(new Date(member.createdAt)) : ''} 
          disabled
          styleLabel={{fontSize: '0.875rem'}} 
          style={{color: '#333'}}
        />
        <Input 
          type='text' 
          name='수정일' 
          value={member?.modifiedAt ? getDate(new Date(member.modifiedAt)) : ''} 
          disabled
          styleLabel={{fontSize: '0.875rem'}} 
          style={{color: '#333'}}
        />
      </div>
    </div>
  )
}

export default UserDetail