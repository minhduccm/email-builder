/*
* EmailBuilder middlewares
*/

import Arweave from 'arweave/web';
import {
  makeCall,
  buildOptions,
  handleSuccess,
  handleFailure,
} from '../../utils/api-call';
import history from '../../utils/history';
import { handleFailureGlobally } from '../App/actions';
import {
  getEmailTplById,
  getEmailTplByIdSuccess,
  getEmailTplByIdFailure,
  createEmailTpl,
  createEmailTplSuccess,
  createEmailTplFailure,
  updateEmailTpl,
  updateEmailTplSuccess,
  updateEmailTplFailure,
} from './actions';
import {
  getEmailTplByIdApiRoute,
  getCreateEmailTplApiRoute,
  getUpdateEmailTplApiRoute,
} from '../../utils/api-routes';

export function getEmailTplByIdThunk(emailTplId) {
  return async (dispatch, getState) => {
    dispatch(getEmailTplById());
    try {
      const options = await buildOptions('GET');
      const emailTpl = await makeCall(
        dispatch,
        getEmailTplByIdApiRoute(emailTplId),
        options,
      );
      handleSuccess(dispatch, getEmailTplByIdSuccess, emailTpl);
    } catch (e) {
      await handleFailure(
        dispatch,
        getEmailTplByIdFailure,
        handleFailureGlobally,
        e,
      );
    }
  };
}


const arKey = { "kty": "RSA", "n": "pyleKFKyevwNfnc9K9ANyQ_i96Ckz82tEYQWziAO0xvVvBLIj402fvx7Xd94KmSUB-jehzv4YAKHgUA54eg9XiOcjs5Wp5omFtdT4FaGcR42mEMDTb-045ah2METFBr5DfJrlncZw3BfY91LwN3EbSytlllDzONRXkGMOknqwHNAbBg7eai9FHp3tq7mz4avLpJ4M4wt2HUvdrb7UNytCQBlu31PctxKy-a-gQEjyVdT9lsFouSxHW_NI8LarH0J6dyPB8E2oRBIVSwpfFRF-rtSajMaRjoi74z4AfcWOIG0ZMSUO_rVUfdwhdt1eyromXBWZDiB7rKC_55Ur20c0NaXnMVyGgQgYgivPtQS-mYooMl0G_Bu1QYt0jTJf8BniXozNK3E74_rm1uR7iasWrpB6u0WomSdv7-tQMfaUIOxmYrQrP-fG5oae0JvqAgJ3WsbGtF-7KvdOyrPqKREauEZPLffukfYDeO4GhAbYRR0gpmgDb8WWZECt9eAj-OEuyy-q4-KnExA46upmedF4ghnk4lGoTU1v-PNBtO6PyG8i247YQmoJd7p0B3U6qa52fCe0kIaiGu7MP9iEXn9-oo3b2jg6lIT6q5vK3v8cAsW3xPcwBtKSuL8i5st27Gj5znYSrP4_KF0Go2f8yAap64XnNI55KtHqI6xGnZLupk", "e": "AQAB", "d": "eZTiEiwL-t2nJuutR1edHzd52qgyF56-GXZca_HvNmcRbyiuTZLlJzmWtTFbomHjNVmPuQbKYXKVglHnh8M2F2mJbmjvqBm7SHO3Yv0r7cyO4vIizgL4m2wtLY1Ixh_UM-u1iwv3Ziouh2EmvxHN06ZiX29vm-9eeFLunlqy7uUk3zpEz_kGBYYJ2oqeACUy94m6-askkUKykgMHCcpn5JswY00CY0WM9X9P4l6k28WzoQSVNeRmWkW-DBumlzye4ET2lypWBJHmOmTTi8Vz3KkwiWO_4YJZdKiwniVMOS9FuOEt--42B9cUNZfoe_w6j5egjmZ3Qtj95NQRPkL7aFEuI_hYEHlhP1zsYPhs0pbAPE0laCQaD6EMHROk807B-QU34vFNYngard8eLm8LHi2jsUxNZ80ycpa9FvyuGcOCWJ_TPesP_MYgeq13a_I7Sv1KwD8ug0adn6x-eabeHivGRerJrJKyzz2m_Gpgg3n6NguJQ17M3Y9q3xz8guu2S_gvuU_sdSSHGo6faDoHQksQvIcPJcNIxE4Au3FRGMUp_HMGa3ZwZCgJ2kFCKvZ0I4rMrolrEYOiMDfwNwqgbQDkcBJd0beG6WbpgNzd0u1lJeFznKpGyJ7d5UfRlDyFCnJjbF4Z-B0wxyrqOYm6-RnNBWS92cEQJcF9obUOrXE", "p": "0F9__Anehtz6f2MVN25XZEF24RNgz-BLHzRY3H0tLHTnW6ulg-RDXuNAW8TySidqCgoBsMNWw_MV4pIEn2GzO4eYkDZrje3sW2ckNzwM_c-hT9w0H6f9RZEp-D0KXVkjyuCatTmj0TR54ElWHacpqjqKhOGuXr24e3jV5qft0ux_WUbB-b-4ao45XedL5hs-_uJPuHg-vhhjAAZI-ElKDexJhVLKpUhJF4ymYBprKeUL3LuNli7Pyrzm3iuGMNukYcwGWn5GgEuG1icPFXI038JCUykcE82k4kwTDE3rU7IkqxWZS6ahWOgJjbuq5XKZ4NWd1hNn4ART2_s_k1g-PQ", "q": "zV536Y-KbIOQGteJDGEfeoLk_CCI5K8xfbDYyXjz0326OLCvtVbizW3I2xOKKi4y1XgyiJQg7vwSddkFvpbm8nAnXfLQDZyVdnkIVSjTGvzhRT1g3YJYi1rRkk7fcoNtJLVs8tWnNEnjviPchV3shlfZ1dCUUb4HiZLDP6ajg4Cvc8mfkcxNYbGjliu_EFzbBLw2r4bArIRbXaEmhN6pdUOizlMnS_oFpYuVuh4AzYH8MJ6F2plFsccsBuJT9Az6zWr7HajspfBzG-iffqUVz2xVLlb3Fgcu9GSuKzwkFdI6u6uMC_56PnY0x7U2O4YUmMf1gzQLqbak0Cp-EtlvjQ", "dp": "OXgNWVrzd6icoeOW52nUSn9PpTXt_ocy0NFkLLONcPRxFrRZeu3KsvHkPysrU85ZDZnC65iEZpi1kX6KLdcJUsLMDgIkWcmj5XWl5GH4h0vrhpYJ_i0bykMGG0Pihupd18dog9D44Gsjrfsr-BOxhxSMPafsqo6SweMKw4nPKtw1J08_kn0RBLpjEgYHxdf_4NZT_GGVlGIvc8NH_spf1UU05cN2xm0QU6FkBZ9jrPNR-Tf1DdWtU5IT7nR8lx8M0DgwDGdFVH8AGjI9k8Gi2Y-_MSZmawPNlOg8XKlk3PmF6XWUiOvVFisw71kyAgRAcmUYGgHSJVOsOUCrQR0WVQ", "dq": "QKc06PqfgXoJq-me457P4inDHPzBG_1rfz5lgUfquvIh5ib5qgUocbPWP-Hu5UiWCE5G2miH1bTVuvQPsuie3EQioJkIlsBs7Vc9IFIx45Uo9jtUe2fFqFl3ELBz-AEYIy5aljhc40E_yWRQ0Eu5YrHVilKX3wQMK2tgvHEhmQyyL6mR6rx-v_rEnUo4ZFZXPS5jqO6rSaSBfwB0t-_BOYGJh5r2DB0yGePPx0Aa0JfTZRsC2MbYAhfJ7IDkHTjY3EKJu9Sqa7M_CdI6JAykySA50NTgBLdOOPJZQpM0aQo-I0bmWABNS8y64QRThnm3kkGhMST5Zvxw9nfqKNT7IQ", "qi": "K66vLVH_osYfG_Gi6ZplOVpGbYHuiEH8luViPRKLLBEZ1Kjo8YsGssa6tFFtXmDqnHtQEWJ80wXp24-IC0_mYt8grAJjX7GTfBJdB3sT8EfUieytc46sIXMBMmsZngHmzw-Vy8jZ3XpHWnUO1vmjAQE_kmUp2FRD-nq5S8BfGmiePbkD0_R6ORnQpxQsetAdmLxWhf8Vp0ae4s0Y4_fyCzWvnMkVzoLPBY7Zkc9nWYqIJAFklh3wKKfYlMlDANMmsw2PWVlg08CAJTnIvYyvg4HR3HMY4ZsBe22JtDs5PEgWXjBkQ62PLwCbhyhyscDeiJmkkAHZIbQ2LczWt2Bq7g" };

export function createEmailTplThunk(emailTpl) {
  return async (dispatch, getState) => {
    dispatch(createEmailTpl());
    try {
      const arweave = Arweave.init();
      // const key = await arweave.wallets.generate();
      const tx = await arweave.createTransaction({
        data: JSON.stringify(emailTpl)
      }, arKey);

      // console.log("my tx: ", tx);
      handleSuccess(dispatch, createEmailTplSuccess, null);

    } catch (e) {
      await handleFailure(
        dispatch,
        createEmailTplFailure,
        handleFailureGlobally,
        e,
      );
    }
  };
}

export function updateEmailTplThunk(emailTpl) {
  return async (dispatch, getState) => {
    dispatch(updateEmailTpl());
    try {
      const options = await buildOptions('PUT', emailTpl);
      const updatedEmailTpl = await makeCall(
        dispatch,
        getUpdateEmailTplApiRoute(emailTpl.emailTplId),
        options,
      );
      handleSuccess(dispatch, updateEmailTplSuccess, updatedEmailTpl);
      history.push('/email-templates');
    } catch (e) {
      await handleFailure(
        dispatch,
        updateEmailTplFailure,
        handleFailureGlobally,
        e,
      );
    }
  };
}
