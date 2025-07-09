import { $, browser, expect } from '@wdio/globals'
import "assert";

/* npm init -y
npm install @wdio/cli webdriverio @wdio/local-runner @wdio/mocha-framework chromedriverOUgeckodriver @wdio/firefox-profile-service --save-dev
npx wdio config
npx wdio run wdio.conf.js //EXECUTAR APP com este comando, CASO ERRO NO COMANDO ANTERIOR */

describe('teste de login no healing',() =>{
    for (let i = 0; i < 1; i++) {
        it(`Execução${i}: Deve logar, verificar alguns componentes e deslogar.`, async() => {
            await browser.url('https://brenorcunha.pythonanywhere.com')
            await browser.setWindowSize(723, 781)
            const usernameInput = $('[name="username"]')
            await usernameInput.click()
            await usernameInput.setValue('brenorc')

            const inputPassword = $('[name="password"]')
            await inputPassword.click()
            await inputPassword.setValue('Breno@123')
            expect(await inputPassword.isEnabled()).toBe(true)

            const loginButton = $('.btn-success')
            expect(await loginButton.isDisplayed()).toBe(true)
            await loginButton.moveTo()
            await loginButton.click()
            
            await browser.pause(1000)
            
            const greetingText = $('.color-dark')
            expect(greetingText.includes('brenorc')).toBe(true)

            const scheduleButton = $('.card-medicos:nth-child(3) > .btn')
            await scheduleButton.moveTo()
            await scheduleButton.click()

            await $('=Healing').click()
            await $('.navbar-toggler-icon').click()
            await $('=Logout').click()
        })
}
})

/* 
describe('WebdriverIO Component Testing', () => {
    it('should be able to render to the DOM and assert', async () => {
        const component = document.createElement('button')
        component.innerHTML = 'Hello World!'
        document.body.appendChild(component)

        await expect($('aria/Hello World!')).toBePresent()
        component.remove()
        await expect($('aria/Hello World!')).not.toBePresent()
    })
}) */
