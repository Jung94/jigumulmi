import type { CreateBannerInput, Banner } from '@/src/4.entities/banner-admin/model/types'

export const initialState: CreateBannerInput = {
  title: "",
  isActive: false,
  outerImage: null,
  innerImage: null,
}

export const initialStateForBanner: Banner = {
  id: 0,
  title: '',
  isActive: false,
  createdAt: '',
  modifiedAt: '',
  outerImageS3Key: null,
  innerImageS3Key: null
}