package com.getcapacitor.myapp

import androidx.lifecycle.Lifecycle
import androidx.test.core.app.ActivityScenario
import androidx.test.espresso.Espresso
import androidx.test.espresso.action.ViewActions
import androidx.test.espresso.assertion.ViewAssertions
import androidx.test.espresso.matcher.ViewMatchers
import androidx.test.ext.junit.rules.ActivityScenarioRule
import gob.regionancash.gds.disabled.MainActivity
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import tools.fastlane.screengrab.Screengrab
import tools.fastlane.screengrab.UiAutomatorScreenshotStrategy
import tools.fastlane.screengrab.locale.LocaleTestRule

@RunWith(JUnit4::class)
class ScreenshotInstrumentedTest {

    // JVMField needed!
    @Rule
    @JvmField
    val localeTestRule = LocaleTestRule()

    @get:Rule
    var activityRule = ActivityScenarioRule(MainActivity::class.java)

    @Test
    fun testTakeScreenshot() {
        val scenario: ActivityScenario<*> = activityRule.scenario
        scenario.moveToState(Lifecycle.State.RESUMED)
        //1
        Screengrab.setDefaultScreenshotStrategy(UiAutomatorScreenshotStrategy())

        /*Espresso.onView(ViewMatchers.withId(R.id.askButton))
                .check(ViewAssertions.matches(ViewMatchers.isDisplayed()))
        //2
        Screengrab.screenshot("rwmagic8ball_beforeFabClick")
        //3
        Espresso.onView(ViewMatchers.withId(R.id.askButton)).perform(ViewActions.click())
        //4
        Screengrab.screenshot("rwmagic8ball_afterFabClick")

         */
    }
}