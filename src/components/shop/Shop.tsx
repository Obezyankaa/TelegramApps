import { useTranslation } from 'react-i18next';
import Title from '../../ui/Title';
import Countdown from './Countdown';
export default function Shop() {
  const { t } = useTranslation();

  return (
    <section style={{padding: '1rem'}}>
      <Title title={t('storeTitle')} />
      <Countdown />
    </section>
  )
}
