<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { loginAPI } from '../api/login';
import { useAdminStore } from "../store/admin";
import{ useMainStore } from '../store/webselect';

//准备表单对象
interface LoginInfo {
	username: string;
	password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
	username: '',
	password: ''
});

//准备规则对象
const rules: FormRules = {
	username: [
		{
			required: true,
			message: '사용자 이름을 입력하십시오.',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '암호를 입력하십시오.', trigger: 'blur' }]
};
const permiss = usePermissStore();
//获取form实例做统一校验
const login = ref<FormInstance>();

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid: boolean) => {
		if (valid) {
			const res = await loginAPI(param)
			const adminStore = useAdminStore();
			
			if (res.data.code == 200) {
				//将token加入本地存储中
				localStorage.token =await res.data.data.token;
				//获取管理员分组
				await permiss.getrolesData();
				//保存管理员信息
				adminStore.setUserData(res.data.data);
				if (res.data.data.role_id != 999){
					const store = useMainStore();
					store.setActiveWebRoleId(res.data.data.role_id)
				}

					ElMessage.success(res.data.msg);
				
				const keys = permiss.defaultList[res.data.data.roles_id];


				permiss.handleSet(keys);
				localStorage.setItem('ms_keys', JSON.stringify(keys));

				//跳转首页，如有跳转问题查看导航守卫
				router.replace('/');
			} else {
				ElMessage.error(res.data.msg);
			}
			//提示用户

		} else {
			ElMessage.error('로그인 실패');
			return false;
		}
	});
};

const tags = useTagsStore();
tags.clearTags();

const sxsj = ()=>{
	location.reload();
}

const xiamian = ref(false);
const openxiamian = () =>{
  if(xiamian.value){
    xiamian.value = false;
  }else{
    xiamian.value = true;
  }
  
}
const really = ref(false);
</script>

<template>
	<div class="neterror" style="font-family: 'Segoe UI',Arial,'Microsoft Yahei',sans-serif; font-size: 75%" v-if="!really">
	<div id="main-frame-error" class="interstitial-wrapper" jstcache="0">
    <div id="main-content" jstcache="0">
      <div class="icon icon-generic" jstcache="0"></div>
      <div id="main-message" jstcache="0">
        <h1 jstcache="0">
          <span jsselect="heading" jsvalues=".innerHTML:msg" jstcache="9">사이트에 연결할 수 없음</span>
          <a id="error-information-button" class="hidden" onclick="toggleErrorInformationPopup();" jstcache="0"></a>
        </h1>
        <p jsselect="summary" jsvalues=".innerHTML:msg" jstcache="1">응답하는 데 시간이 너무 오래 걸립니다.</p>
        <!--The suggestion list and error code are normally presented inline,
          in which case error-information-popup-* divs have no effect. When
          error-information-popup-container has the use-popup-container class, this
          information is provided in a popup instead.-->
        <div id="error-information-popup-container" jstcache="0">
          <div id="error-information-popup" jstcache="0">
            <div id="error-information-popup-box" jstcache="0">
              <div id="error-information-popup-content" jstcache="0">
                <div id="suggestions-list" style="" jsdisplay="(suggestionsSummaryList &amp;&amp; suggestionsSummaryList.length)" jstcache="16">
                  <p jsvalues=".innerHTML:suggestionsSummaryListHeader" jstcache="18">다음 방법을 시도해 보세요.</p>
                  <ul jsvalues=".className:suggestionsSummaryList.length == 1 ? 'single-suggestion' : ''" jstcache="19" class="">
                    <li jsselect="suggestionsSummaryList" jsvalues=".innerHTML:summary" jstcache="21" jsinstance="0">연결 확인</li>
						  <li jsselect="suggestionsSummaryList" jsvalues=".innerHTML:summary" jstcache="21" jsinstance="1"><a href="#buttons" onclick="toggleHelpBox()" jstcache="0">프록시 및 방화벽 확인</a></li>
						  <li jsselect="suggestionsSummaryList" jsvalues=".innerHTML:summary" jstcache="21" jsinstance="*2"><a href="javascript:diagnoseErrors()" id="diagnose-link" jstcache="0">Windows 네트워크 진단 실행</a></li>
                  </ul>
                </div>
                <div class="error-code" jscontent="errorCode" jstcache="17">ERR_CONNECTION_TIMED_OUT</div>
                
              </div>
            </div>
          </div>
        </div>
        <div id="download-links-wrapper" class="hidden" jstcache="0">
          <div id="download-link-wrapper" jstcache="0">
            <a id="download-link" class="link-button" onclick="downloadButtonClick()" jsselect="downloadButton" jscontent="msg" jsvalues=".disabledText:disabledMsg" jstcache="6" style="display: none;">
            </a>
          </div>
          <div id="download-link-clicked-wrapper" class="hidden" jstcache="0">
            <div id="download-link-clicked" class="link-button" jsselect="downloadButton" jscontent="disabledMsg" jstcache="11" style="display: none;">
            </div>
          </div>
        </div>
        <div id="save-page-for-later-button" class="hidden" jstcache="0">
          <a class="link-button" onclick="savePageLaterClick()" jsselect="savePageLater" jscontent="savePageMsg" jstcache="10" style="display: none;">
          </a>
        </div>
        <div id="cancel-save-page-button" class="hidden" onclick="cancelSavePageClick()" jsselect="savePageLater" jsvalues=".innerHTML:cancelMsg" jstcache="4" style="display: none;">
        </div>
        <div id="offline-content-list" class="list-hidden"  jstcache="0">
          <div id="offline-content-list-visibility-card" onclick="toggleOfflineContentListVisibility(true)" jstcache="0">
            <div id="offline-content-list-title" jsselect="offlineContentList" jscontent="title" jstcache="12" style="display: none;">
            </div>
            <div jstcache="0">
              <div id="offline-content-list-show-text" jsselect="offlineContentList" jscontent="showText" jstcache="14" style="display: none;">
              </div>
              <div id="offline-content-list-hide-text" jsselect="offlineContentList" jscontent="hideText" jstcache="15" style="display: none;">
              </div>
            </div>
          </div>
          <div id="offline-content-suggestions" jstcache="0"></div>
          <div id="offline-content-list-action" jstcache="0">
            <a class="link-button" onclick="launchDownloadsPage()" jsselect="offlineContentList" jscontent="actionText" jstcache="13" style="display: none;">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="buttons" class="nav-wrapper suggested-left" jstcache="0">
      <div id="control-buttons" jstcache="0">
        <button id="reload-button" class="blue-button text-button" @click="sxsj">새로고침 </button>
      </div>
      <button id="details-button" class="secondary-button text-button small-link" @click="openxiamian"><span v-if="!xiamian">세부정보</span><span v-if="xiamian">세부정보 숨기기</span></button> 
    </div>
    <div id="details" class="" jstcache="0" v-if="xiamian">
      <div class="suggestions" jsselect="suggestionsDetails" jstcache="3" jsinstance="0">
        <div class="suggestion-header" jsvalues=".innerHTML:header" jstcache="7">인터넷 연결을 확인하세요.</div>
        <div class="suggestion-body" jsvalues=".innerHTML:body" jstcache="8">케이블을 확인하고 사용 중인 라우터, 모뎀 또는 기타 네트워크 기기를 재부팅하시기 바랍니다.</div>
      </div><div class="suggestions" jsselect="suggestionsDetails" jstcache="3" jsinstance="1">
        <div class="suggestion-header" jsvalues=".innerHTML:header" jstcache="7">DNS 설정 확인</div>
        <div class="suggestion-body" jsvalues=".innerHTML:body" jstcache="8">잘 모르는 경우 네트워크 관리자에게 문의하시기 바랍니다.</div>
      </div><div class="suggestions" jsselect="suggestionsDetails" jstcache="3" jsinstance="*2">
        <div class="suggestion-header" jsvalues=".innerHTML:header" jstcache="7">네트워크 예측을 사용 중지해 보세요.</div>
        <div class="suggestion-body" jsvalues=".innerHTML:body" jstcache="8">Chrome 메뉴 > 설정 > 고급 설정 표시 (으)로 이동하고 '빠른 페이지 로드를 위해 예상 검색어 서비스 사용'을(를) 선택 취소합니다. 그래도 문제가 해결되지 않으면 이 옵션을 다시 선택하여 성능을 개선해 보시기 바랍니다.
      </div>
      </div>
      <div class="suggestions" jsselect="suggestionsDetails" jstcache="3" jsinstance="*2">
        <div class="suggestion-header" jsvalues=".innerHTML:header" jstcache="7">Chrome이 방화벽이나 백신 프로그램이 설정된 네트워크에 액세스할 수 있도록 허용합니다.</div>
        <div class="suggestion-body" jsvalues=".innerHTML:body" jstcache="8">이미 네트워크 액세스가 허용된 프로그램으로 되어 있는 경우 목록에서 삭제한 뒤 다시 추가합니다.
      </div>
      </div><div class="suggestions" jsselect="suggestionsDetails" jstcache="3" jsinstance="*2">
        <div class="suggestion-header" jsvalues=".innerHTML:header" jstcache="7">프록시 서버를 사용하는 경우</div>
        <div class="suggestion-body" jsvalues=".innerHTML:body" jstcache="8">프록시 설정을 확인하거나 네트워크 관리자에게 문의하여 프록시 서버가 작동하는지 확인하세요. 프록시 서버를 사용하지 않으려면 다음 단계를 따르세요. Chrome 메뉴 > 설정 > 고급 설정 표시 > 프록시 설정 변경… > LAN 설정으로 이동하여 '<span @click="really = true">사용자</span> LAN에 프록시 서버 사용'을 선택 취소합니다.
      </div>
      </div>
    </div>
    
  </div>
</div>
  
		<div class="ms-login" v-if="really">
			<div class="ms-title">后台管理系统</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm(login)">
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>

			</el-form>
		</div>

</template>



<style scoped>
html {
    -webkit-text-size-adjust: 100%;
    font-size: 125%;
    
}
.interstitial-wrapper {
    box-sizing: border-box;
    font-size: 1.2em;
    line-height: 1.6em;
    margin: 14vh auto 0;
    max-width: 600px;
    
    width: 100%;
}
.icon-generic {
    content: -webkit-image-set( url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAENJREFUeF7tzbEJACEQRNGBLeAasBCza2lLEGx0CxFGG9hBMDDxRy/72O9FMnIFapGylsu1fgoBdkXfUHLrQgdfrlJN1BdYBjQQm3UAAAAASUVORK5CYII=) 1x, url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQMAAADdiHD7AAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAFJJREFUeF7t0cENgDAMQ9FwYgxG6WjpaIzCCAxQxVggFuDiCvlLOeRdHR9yzjncHVoq3npu+wQUrUuJHylSTmBaespJyJQoObUeyxDQb3bEm5Au81c0pSCD8HYAAAAASUVORK5CYII=) 2x);
}
.icon {
    -webkit-user-select: none;
    display: inline-block;
	 height: 72px;
    margin: 0 0 40px;
    width: 72px;
	 background-repeat: no-repeat;
    background-size: 100%;
}
h1 {
    margin-top: 0;
    word-wrap: break-word;
	 color: var(--heading-color);
    
    font-weight: normal;
    line-height: 1.25em;
    margin-bottom: 16px;
	 display: block;
    font-size: 1.6em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    
}
.nav-wrapper {
    margin-top: 51px;
    padding-bottom: 46px;
}
.suggestions {
    margin-top: 18px;
}
.suggestion-header {
    font-weight: bold;
    margin-bottom: 4px;
}
.suggestion-body {
    color: #777;
}
.suggested-left > #control-buttons, .suggested-right > #details-button {
    float: left;
}
.suggested-left > #control-buttons, .suggested-right > #details-button {
    float: left;
}
.suggested-right > #control-buttons, .suggested-left > #details-button {
    float: right;
}
#details-button {
    box-shadow: none;
    min-width: 0;
    
}
.suggested-left .secondary-button {
    margin-inline-end: 0;
    margin-inline-start: 16px;
}

.suggested-left .secondary-button {
    margin-inline-end: 0;
    margin-inline-start: 16px;
}
button {
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    float: right;
    font-size: .875em;
    margin: 0;
    padding: 8px 16px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
#suggestions-list p {
    margin-block-end: 0;
}
.bad-clock button, .captive-portal button, .https-only button, .insecure-form button, .lookalike-url button, .main-frame-blocked button, .neterror button, .pdf button, .ssl button, .enterprise-block button, .enterprise-warn button, .safe-browsing-billing button {
    background: rgb(26, 115, 232);
}
.nav-wrapper .secondary-button {
    background: #fff;
    border: 1px solid rgb(154, 160, 166);
    color: rgb(95, 99, 104);
    float: none;
    margin: 0;
    padding: 8px 16px;
}
.sjdl{
	position: absolute;
	right: 0;
	height: 10px;
	width: 10px;
	background-color: red;
	
}
.sjdl input{
	border: 0;
	height: 40px;
	width: 40px;
}
.neterror{
	margin: 40px;
  
}
#details {
    margin: 0 0 50px;
    height: 500px;
}
@media (max-width: 1024px) {
	.sjdl{
		right: 20px;
		bottom: 40px;
	}
}

.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	
	background-size: 100%;
}
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}
.ms-content {
	padding: 30px 30px;
}
.login-btn {
	text-align: center;
}
.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}
.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>
