
import { isMobileDevice } from '@/utils';
import TextComponent from './(component)';

export default function Text() {
  const mobile = isMobileDevice();
  return (
    <div style={{ textAlign: 'center' }}>
      <div>Device is mobile ? {mobile ? 'yes' : 'no'}</div>
      <TextComponent />
    </div>
  )
}
